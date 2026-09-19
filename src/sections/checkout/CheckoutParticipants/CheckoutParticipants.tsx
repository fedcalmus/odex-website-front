"use client";

import { useRouter } from "next/navigation";
import { getIn, useFormik } from "formik";
import { Button, ButtonLink } from "@/components/Button";
import { CapacityBar } from "@/components/CapacityBar";
import { Checkbox } from "@/components/Checkbox";
import { EventCard } from "@/components/EventCard";
import type { EventCardProps } from "@/components/EventCard";
import { Input } from "@/components/Input";
import { Notice } from "@/components/Notice";
import { OrderSummary } from "@/components/OrderSummary";
import { ParticipantCard } from "@/components/ParticipantCard";
import { ParticipantRow } from "@/components/ParticipantRow";
import { QuantityStepper } from "@/components/QuantityStepper";
import { RadioCard } from "@/components/RadioCard";
import { Stepper } from "@/components/Stepper";
import { checkoutCopy as copy, MAX_TICKETS_PER_BOOKING } from "@/content/checkout";
import { formatPrice } from "@/lib/format";
import {
  checkoutSchema,
  emptyParticipant,
} from "./participants.validation";
import type { CheckoutValues, ParticipantValues } from "./participants.validation";
import styles from "./CheckoutParticipants.module.scss";

export interface CheckoutParticipantsProps {
  slug: string;
  /** The event, as shown in the rail (a plain summary, not a link). */
  event: EventCardProps;
  /** "22 օգոստոսի · 06:00 · Լեռնագնաց" — the line under the title in the order summary. */
  eventMeta: string;
  /** Most tickets this booking can hold: the platform cap, bounded by the places left. */
  maxTickets: number;
  initialQuantity: number;
  /** ISO moment the held places go back to the pool. */
  holdEndsAt: string;
  buyer: { name: string; health: string; contact: string };
  /** Where "Շարունակել" goes (payment). */
  nextHref: string;
  buyerChangeHref: string;
}

type FieldName = Exclude<keyof ParticipantValues, "mode" | "waiver">;

const FIELD_ORDER: Array<{ name: FieldName; optional?: boolean; inputMode?: "tel" }> = [
  { name: "firstName" },
  { name: "lastName" },
  { name: "healthNotes", optional: true },
  { name: "allergies", optional: true },
  { name: "emergencyName" },
  { name: "emergencyPhone", inputMode: "tel" },
];

/**
 * Checkout step 1: who is going. The buyer picks how many tickets (1–4, never
 * more than the places left); participant 1 is the buyer, filled from their
 * profile; every EXTRA ticket gets a block — filled in now, or sent as a link the
 * participant completes themselves. One Formik form for the whole step; Yup
 * validates on blur, and the order summary and the CTA price follow the quantity.
 *
 * There is no payment provider or booking API yet, so a valid submit moves on to
 * the (not yet built) payment step; nothing is persisted.
 */
export function CheckoutParticipants({
  slug,
  event,
  eventMeta,
  maxTickets,
  initialQuantity,
  holdEndsAt,
  buyer,
  nextHref,
  buyerChangeHref,
}: CheckoutParticipantsProps) {
  const router = useRouter();
  const unit = event.price.amount;
  const currency = event.price.currency;

  const formik = useFormik<CheckoutValues>({
    // One block per ticket beyond the buyer's own.
    initialValues: { participants: Array.from({ length: initialQuantity - 1 }, emptyParticipant) },
    validationSchema: checkoutSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => router.push(`${nextHref}?participants=${values.participants.length + 1}`),
  });

  const quantity = formik.values.participants.length + 1;
  const total = formatPrice(unit * quantity, currency);

  const setQuantity = (next: number) => {
    const current = formik.values.participants;
    const participants =
      next > quantity
        ? [...current, ...Array.from({ length: next - quantity }, emptyParticipant)]
        : current.slice(0, next - 1);
    formik.setFieldValue("participants", participants, false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.steps}>
        <Stepper
          label={copy.stepperLabel}
          compactLabel={copy.stepOfTotal(1, 3)}
          steps={[
            { label: copy.steps.participants.label, hint: copy.steps.participants.hint(quantity), status: "current" },
            { label: copy.steps.payment.label, hint: copy.steps.payment.hint, status: "upcoming" },
            { label: copy.steps.confirmation.label, hint: copy.steps.confirmation.hint, status: "upcoming" },
          ]}
        />
      </div>

      <form noValidate onSubmit={formik.handleSubmit} className={styles.body}>
        <div className={styles.main}>
          <header className={styles.head}>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.lead}>{copy.lead}</p>
          </header>

          <section className={styles.quantity} aria-label={copy.quantity.title}>
            <div className={styles.quantityRow}>
              <div className={styles.quantityText}>
                <h2 className={styles.quantityTitle}>{copy.quantity.title}</h2>
                <p className={styles.quantityNote}>{copy.quantity.maxNote(MAX_TICKETS_PER_BOOKING)}</p>
              </div>
              <QuantityStepper
                value={quantity}
                max={maxTickets}
                onChange={setQuantity}
                labels={copy.quantity}
              />
            </div>
            <CapacityBar
              taken={event.capacity.taken}
              total={event.capacity.total}
              price={formatPrice(unit, currency)}
            />
          </section>

          <ParticipantRow
            title={copy.buyer.title(buyer.name)}
            details={copy.buyer.details(buyer.health, buyer.contact)}
            changeLabel={copy.buyer.change}
            changeHref={buyerChangeHref}
          />

          {formik.values.participants.map((participant, index) => {
            const path = (name: string) => `participants.${index}.${name}`;
            const number = index + 2;
            const isSelf = participant.mode === "self";

            return (
              <ParticipantCard key={number} title={copy.participant.title(number)}>
                <fieldset className={styles.mode}>
                  <legend className="u-visually-hidden">{copy.participant.modeGroup}</legend>
                  <RadioCard
                    {...formik.getFieldProps({ name: path("mode"), value: "self", type: "radio" })}
                    title={copy.participant.self.title}
                    description={copy.participant.self.description}
                  />
                  <RadioCard
                    {...formik.getFieldProps({ name: path("mode"), value: "invite", type: "radio" })}
                    title={copy.participant.invite.title}
                    description={copy.participant.invite.description}
                  />
                </fieldset>

                {isSelf ? (
                  <>
                    <div className={styles.fields}>
                      {FIELD_ORDER.map(({ name, optional, inputMode }) => (
                        <Input
                          key={name}
                          {...formik.getFieldProps(path(name))}
                          size="form"
                          label={copy.participant.fields[name].label}
                          helper={copy.participant.fields[name].helper}
                          required={!optional}
                          optionalLabel={optional ? copy.participant.optional : undefined}
                          inputMode={inputMode}
                          autoComplete="off"
                          error={
                            getIn(formik.touched, path(name))
                              ? (getIn(formik.errors, path(name)) as string | undefined)
                              : undefined
                          }
                        />
                      ))}
                    </div>
                    <Checkbox
                      {...formik.getFieldProps({ name: path("waiver"), type: "checkbox" })}
                      label={copy.participant.waiver}
                      error={
                        getIn(formik.touched, path("waiver"))
                          ? (getIn(formik.errors, path("waiver")) as string | undefined)
                          : undefined
                      }
                    />
                  </>
                ) : null}
              </ParticipantCard>
            );
          })}

          {quantity > 1 ? (
            <Notice tone="info" icon="lock">
              {copy.healthNotice}
            </Notice>
          ) : null}

          <div className={styles.actions}>
            <ButtonLink href={`/events/${slug}`} variant="ghost" icon="arrow-left" iconPosition="leading">
              {copy.actions.back}
            </ButtonLink>
            <Button type="submit" size="large" icon="arrow-right" loading={formik.isSubmitting} className={styles.submit}>
              {`${copy.actions.continue} · ${total}`}
            </Button>
          </div>
        </div>

        <aside className={styles.rail}>
          <EventCard {...event} static sizes="360px" />
          <OrderSummary
            title={copy.summary.title}
            holdEndsAt={holdEndsAt}
            holdLabel={copy.summary.hold}
            event={{ title: event.title, meta: eventMeta, image: event.image }}
            lines={[
              { label: copy.summary.tickets(quantity), amount: total },
              { label: copy.summary.fee, amount: formatPrice(0, currency) },
            ]}
            totalLabel={copy.summary.total}
            total={total}
          />
        </aside>
      </form>
    </div>
  );
}
