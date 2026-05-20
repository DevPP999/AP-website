import React from "react";
import ApplicationFormClient from "./ApplicationFormClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ApplicationFormPage({ params }: Props) {
  const { locale } = await params;
  const localeSafe = locale === "th" ? "th" : "en";

  return (
    <React.Suspense fallback={<div />}>
      <ApplicationFormClient localeSafe={localeSafe} />
    </React.Suspense>
  );
}
