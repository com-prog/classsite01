"use client";

import { useActionState } from "react";

import { saveHero, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { HeroText, heroFields } from "@/lib/data";

const inputClass =
  "w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50";

/** 히어로 문구 입력 칸. 지금 사이트에 보이는 문구가 미리 채워져 있습니다. */
export function HeroForm({
  fields,
  values,
}: {
  fields: typeof heroFields;
  values: HeroText;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHero, {});

  return (
    <form action={action} className="grid gap-4">
      {fields.map((field) => (
        <label key={field.key} className="grid gap-1.5 text-sm">
          <span className="font-medium">{field.label}</span>
          {"multiline" in field ? (
            <textarea
              name={field.key}
              rows={3}
              required
              defaultValue={values[field.key]}
              className={`${inputClass} py-2`}
            />
          ) : (
            <input
              name={field.key}
              required
              defaultValue={values[field.key]}
              className={`${inputClass} h-10`}
            />
          )}
        </label>
      ))}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중..." : "저장"}
        </Button>
        {state.message ? (
          <p className={state.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
