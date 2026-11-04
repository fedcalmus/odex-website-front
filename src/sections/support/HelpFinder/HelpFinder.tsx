"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import type { SupportCategory, SupportFaq } from "@/content/support";
import { cx } from "@/lib/cx";
import styles from "./HelpFinder.module.scss";

export interface HelpFinderCopy {
  search: { label: string; placeholder: string };
  categories: readonly SupportCategory[];
  faqHeading: string;
  faqs: readonly SupportFaq[];
  emptyState: { title: string; description: string };
}

/**
 * Search + category tiles + FAQ accordion (Figma "Support — MP-28"). The
 * mock only shows FAQ rows as chevron links with no visible answer, but a
 * link to nowhere isn't a real help center — these are real `<details>`
 * disclosures, and the category tiles double as one-click filters into the
 * same list (clicking "Վճարում և վերադարձ" narrows the FAQs below to that
 * topic) rather than being decorative, since there's nowhere else on the
 * site for them to link to yet.
 */
export function HelpFinder({ copy }: { copy: HelpFinderCopy }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleFaqs = useMemo(() => {
    return copy.faqs.filter((faq) => {
      const matchesCategory = !activeCategory || faq.categories.includes(activeCategory);
      const matchesQuery =
        !normalizedQuery ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [copy.faqs, activeCategory, normalizedQuery]);

  return (
    <div className={styles.wrap}>
      <div className={styles.searchBox}>
        <Icon name="search" size={18} className={styles.searchIcon} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.search.placeholder}
          aria-label={copy.search.label}
          autoComplete="off"
          className={styles.searchInput}
        />
      </div>

      <ul role="list" className={styles.categoryGrid}>
        {copy.categories.map((category) => {
          const active = category.id === activeCategory;
          return (
            <li key={category.id}>
              <button
                type="button"
                className={cx(styles.categoryCard, active && styles.categoryCardActive)}
                aria-pressed={active}
                onClick={() => setActiveCategory(active ? null : category.id)}
              >
                <Icon name={category.icon} size={20} className={styles.categoryIcon} />
                <span className={styles.categoryTitle}>{category.title}</span>
                <span className={styles.categoryDescription}>{category.description}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <section aria-labelledby="support-faq-heading" className={styles.faqSection}>
        <SectionHeading id="support-faq-heading" title={copy.faqHeading} />

        {visibleFaqs.length > 0 ? (
          <ul role="list" className={styles.faqList}>
            {visibleFaqs.map((faq) => (
              <li key={faq.id}>
                <details className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    <span>{faq.question}</span>
                    <Icon name="chevron-right" size={18} className={styles.faqChevron} />
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title={copy.emptyState.title} description={copy.emptyState.description} />
        )}
      </section>
    </div>
  );
}
