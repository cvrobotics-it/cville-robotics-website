"use client";

import { useEffect, useRef } from "react";

export function useModalDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;

    const wasLocked = document.body.classList.contains("overflow-hidden");
    const handleClose = () => onClose();
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "a[href], button, input, select, textarea, summary, [tabindex]",
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.matches(":disabled") &&
          element.getClientRects().length > 0,
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("keydown", containFocus);
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("[data-modal-close]")?.focus();
    document.body.classList.add("overflow-hidden");

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("keydown", containFocus);
      if (dialog.open) dialog.close();
      if (!wasLocked) document.body.classList.remove("overflow-hidden");
    };
  }, [open, onClose]);

  return ref;
}
