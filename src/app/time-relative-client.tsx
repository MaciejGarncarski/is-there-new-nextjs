"use client";

import { formatRelativeTime } from "@/app/format-date.utils";

export const TimeRelativeClient = ({ date }: { date: Date }) => {
  return <p className="text-sm">{formatRelativeTime(date)}</p>;
};
