"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { EventComment } from "@/data/events";
import { cx } from "@/lib/cx";
import styles from "./CommentThread.module.scss";

export interface CommentThreadCopy {
  like: string;
  liked: string;
  replyBadge: string;
  inputLabel: string;
  inputPlaceholder: string;
  submit: string;
  postedJustNow: string;
  /** Shown instead of a real name on a comment posted this visit — there's no account system wired in here yet. */
  you: string;
  empty: { title: string; description: string };
}

interface CommentState extends EventComment {
  liked: boolean;
}

/**
 * "Հարցեր ակումբին" (Figma "Event detail - MP-03 (1)"): a question, the
 * club's reply if there is one, then an input to post a new question.
 * "Like" is a real local toggle (no backend to persist it, same pattern as
 * FollowButton); posting appends to local state so the thread genuinely
 * grows during the visit, rather than a text box that goes nowhere. The
 * mock's per-comment "Պատասխանել" (reply-to-this) was left out — there's
 * no nested-reply UI here, only the one composer at the foot of the thread.
 */
export function CommentThread({ comments, copy }: { comments: readonly EventComment[]; copy: CommentThreadCopy }) {
  const [items, setItems] = useState<CommentState[]>(() => comments.map((comment) => ({ ...comment, liked: false })));
  const [draft, setDraft] = useState("");
  const inputId = useId();

  const toggleLike = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, liked: !item.liked, likeCount: item.likeCount + (item.liked ? -1 : 1) } : item,
      ),
    );
  };

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setItems((current) => [
      { id: `local-${current.length}-${Date.now()}`, authorName: copy.you, postedLabel: copy.postedJustNow, body, likeCount: 0, liked: false },
      ...current,
    ]);
    setDraft("");
  };

  return (
    <div className={styles.wrap}>
      {items.length > 0 ? (
        <ul role="list" className={styles.list}>
          {items.map((comment) => (
            <li key={comment.id} className={styles.thread}>
              <div className={styles.comment}>
                <span className={styles.avatar} aria-hidden="true">
                  {comment.authorPhoto ? (
                    <Image src={comment.authorPhoto} alt="" fill sizes="36px" className={styles.avatarImage} />
                  ) : (
                    comment.authorName.charAt(0)
                  )}
                </span>
                <div className={styles.bubble}>
                  <p className={styles.author}>{comment.authorName}</p>
                  <p className={styles.body}>{comment.body}</p>
                </div>
              </div>

              <div className={styles.actions}>
                <span>{comment.postedLabel}</span>
                <button
                  type="button"
                  aria-pressed={comment.liked}
                  className={cx(styles.like, comment.liked && styles.likeActive)}
                  onClick={() => toggleLike(comment.id)}
                >
                  {comment.liked ? copy.liked : copy.like} · {comment.likeCount}
                </button>
              </div>

              {comment.reply ? (
                <div className={styles.reply}>
                  <p className={styles.replyHeader}>
                    <span className={styles.replyAuthor}>{comment.reply.authorName}</span>
                    <span className={styles.replyBadge}>{copy.replyBadge}</span>
                    <span className={styles.replyPosted}>{comment.reply.postedLabel}</span>
                  </p>
                  <p className={styles.replyBody}>{comment.reply.body}</p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>{copy.empty.title}</p>
          <p className={styles.emptyDescription}>{copy.empty.description}</p>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <span className={styles.avatar} aria-hidden="true" />
        <label htmlFor={inputId} className="u-visually-hidden">
          {copy.inputLabel}
        </label>
        <input
          id={inputId}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={copy.inputPlaceholder}
          autoComplete="off"
          className={styles.input}
        />
        <button type="submit" aria-label={copy.submit} disabled={!draft.trim()} className={styles.send}>
          <Icon name="arrow-up" size={18} />
        </button>
      </form>
    </div>
  );
}
