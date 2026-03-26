"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";

const DEFAULT_ACCEPT = "image/*,.pdf,.ai,.eps,application/pdf";

const MAX_BYTES = 4 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isAllowedFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  if (file.type === "application/pdf") return true;
  if (file.type === "application/postscript") return true;
  if (
    file.type === "application/illustrator" ||
    file.type.includes("illustrator")
  )
    return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ["pdf", "png", "jpg", "jpeg", "gif", "webp", "svg", "ai", "eps"].includes(
    ext
  );
}

type Props = {
  name?: string;
  accept?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
  maxBytes?: number;
  className?: string;
};

export function FileDropzone({
  name = "file",
  accept = DEFAULT_ACCEPT,
  file,
  onFileChange,
  disabled = false,
  maxBytes = MAX_BYTES,
  className,
}: Props) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const assignToInput = useCallback(
    (next: File | null) => {
      const input = inputRef.current;
      if (!input) return;
      const dt = new DataTransfer();
      if (next) dt.items.add(next);
      input.files = dt.files;
    },
    []
  );

  useEffect(() => {
    assignToInput(file);
  }, [file, assignToInput]);

  const trySetFile = useCallback(
    (next: File | null) => {
      setLocalError(null);
      if (!next) {
        onFileChange(null);
        assignToInput(null);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      if (!isAllowedFile(next)) {
        setLocalError("Use an image, PDF, or vector file (AI/EPS).");
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      if (next.size > maxBytes) {
        setLocalError(`File must be under ${formatFileSize(maxBytes)}.`);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      onFileChange(next);
    },
    [assignToInput, maxBytes, onFileChange]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    trySetFile(f);
  };

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const { clientX: x, clientY: y } = e;
    const pad = 2;
    if (
      x < rect.left - pad ||
      x > rect.right + pad ||
      y < rect.top - pad ||
      y > rect.bottom + pad
    ) {
      setIsDragging(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0] ?? null;
    trySetFile(dropped);
  };

  const previewUrl = file?.type.startsWith("image/")
    ? URL.createObjectURL(file)
    : null;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={onInputChange}
        disabled={disabled}
        aria-label="Upload design file"
      />

      {!file ? (
        <button
          type="button"
          disabled={disabled}
          onClick={openPicker}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={cn(
            "group relative flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center outline-none transition-[border-color,background-color,box-shadow,transform] duration-200 motion-safe:transition-[border-color,background-color,box-shadow,transform]",
            "border-white/[0.18] bg-background/40 hover:border-accent-purple/45 hover:bg-accent-purple/[0.06]",
            isDragging &&
              "scale-[1.01] border-accent-orange/60 bg-accent-orange/[0.08] shadow-glow-orange",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-accent-orange transition-[color,background-color] duration-200 group-hover:bg-accent-purple/20 group-hover:text-accent-purple"
            aria-hidden
          >
            <UploadIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">
              Drag & drop your design or{" "}
              <span className="text-accent-orange group-hover:underline">
                click to upload
              </span>
            </p>
            <p className="mt-1 text-xs text-muted">
              PNG, JPG, WebP, SVG, PDF, AI, EPS · up to{" "}
              {formatFileSize(maxBytes)}
            </p>
          </div>
        </button>
      ) : (
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-white/[0.1] bg-background/60",
            "motion-safe:animate-file-preview-in motion-reduce:animate-none"
          )}
        >
          <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
            <div className="relative flex min-h-[140px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-black/40 sm:max-w-[12rem]">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- blob URL preview
                <img
                  src={previewUrl}
                  alt={`Preview of ${file.name}`}
                  className="max-h-40 w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-muted">
                  <PdfIcon className="h-12 w-12 text-accent-orange/80" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    Preview
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                  Attached file
                </p>
                <p className="mt-1 break-all text-sm font-medium text-white">
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs tabular-nums text-muted">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={openPicker}
                  disabled={disabled}
                  className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-accent-purple/35 hover:bg-white/[0.08]"
                >
                  Replace file
                </button>
                <button
                  type="button"
                  onClick={() => trySetFile(null)}
                  disabled={disabled}
                  className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition-colors hover:bg-red-500/15"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {localError ? (
        <p className="text-xs text-red-300" role="alert">
          {localError}
        </p>
      ) : null}
    </div>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h6l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
      />
      <path strokeLinecap="round" d="M13 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}
