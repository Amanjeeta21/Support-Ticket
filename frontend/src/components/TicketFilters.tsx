import { useEffect, useId, useRef, useState } from "react";
import type { Priority, Status } from "../types/ticket";

interface TicketFiltersProps {
  search: string;
  status: Status | "";
  priority: Priority | "";
  order: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: Status | "") => void;
  onPriorityChange: (value: Priority | "") => void;
  onOrderChange: (value: "asc" | "desc") => void;
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const dropdownId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldFocusOption = useRef(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  useEffect(() => {
    if (isOpen && shouldFocusOption.current) {
      optionRefs.current[activeIndex]?.focus();
      shouldFocusOption.current = false;
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        const nextIndex = selectedIndex;
        setActiveIndex(nextIndex);
        shouldFocusOption.current = true;
        setIsOpen(true);
        return;
      }

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (activeIndex + direction + options.length) % options.length;
      setActiveIndex(nextIndex);
      optionRefs.current[nextIndex]?.focus();
      return;
    }

    if (isOpen && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : options.length - 1;
      setActiveIndex(nextIndex);
      optionRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        onClick={() => {
          setActiveIndex(selectedIndex);
          setIsOpen((open) => !open);
        }}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-[#cdb6a2] bg-[#faf8f4] px-3 py-2.5 text-left text-sm text-[#4a3024] transition-colors hover:border-[#a98a72] focus:border-[#6b4634] focus:outline-none focus:ring-2 focus:ring-[#6b4634]/20"
      >
        <span>{options[selectedIndex]?.label}</span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-[#765848] transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id={dropdownId}
          role="listbox"
          aria-label={label}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-[#d8c4b2] bg-[#fffdfa] p-1 shadow-lg shadow-[#4a3024]/10"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors focus:outline-none ${
                  isSelected
                    ? "bg-[#f1e8de] font-semibold text-[#4a3024]"
                    : "text-[#765848] hover:bg-[#f7f2ec] hover:text-[#4a3024]"
                } ${activeIndex === index ? "ring-1 ring-inset ring-[#d8c4b2]" : ""}`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-[#6b4634]"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="m4.5 10.5 3.5 3.5 7.5-8"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.75"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TicketFilters({
  search,
  status,
  priority,
  order,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onOrderChange,
}: TicketFiltersProps) {
  return (
    <div className="grid gap-3 p-5 md:grid-cols-4">
      <input
        type="text"
        placeholder="Search title or email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-lg border border-[#cdb6a2] bg-[#faf8f4] px-3 py-2.5 text-sm text-[#4a3024] outline-none placeholder:text-[#947967] transition-colors hover:border-[#a98a72] focus:border-[#6b4634] focus:ring-2 focus:ring-[#6b4634]/20"
      />

      <FilterDropdown
        label="Filter by status"
        value={status}
        onChange={(value) => onStatusChange(value as Status | "")}
        options={[
          { value: "", label: "All Statuses" },
          { value: "OPEN", label: "Open" },
          { value: "IN_PROGRESS", label: "In Progress" },
          { value: "RESOLVED", label: "Resolved" },
        ]}
      />

      <FilterDropdown
        label="Filter by priority"
        value={priority}
        onChange={(value) => onPriorityChange(value as Priority | "")}
        options={[
          { value: "", label: "All Priorities" },
          { value: "LOW", label: "Low" },
          { value: "MEDIUM", label: "Medium" },
          { value: "HIGH", label: "High" },
        ]}
      />

      <FilterDropdown
        label="Sort tickets by date"
        value={order}
        onChange={(value) => onOrderChange(value as "asc" | "desc")}
        options={[
          { value: "desc", label: "Newest First" },
          { value: "asc", label: "Oldest First" },
        ]}
      />
    </div>
  );
}