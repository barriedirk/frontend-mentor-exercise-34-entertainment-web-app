import type { Signal } from "@preact/signals-react";

export const bindInput = <T extends Signal>(
  signal: T
): React.InputHTMLAttributes<HTMLInputElement> => {
  type SignalType = T extends Signal<infer U> ? U : never;

  return {
    value: signal as SignalType,
    onInput: (event) => (signal.value = event.currentTarget.value),
  };
};
