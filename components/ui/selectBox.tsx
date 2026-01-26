"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useEffect, useState } from "react";

type OptionsProp = {
  value: string;
  label: string;
  img: string;
};

type TokenSelectProps = {
  defaultValue?: string;
  options: OptionsProp[];
  state?: string;
  setState?: (_value: {}) => void;
};

export const TokenSelect = ({
  defaultValue,
  options,
  setState,
}: TokenSelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const findOption = options.find((option) => option?.value === value);

  useEffect(() => {
    if (setState !== undefined && value) {
      return setState(value);
    }
  }, [value, setState]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between hover:bg-transparent px-3 py-5 bg-transparent border-none shadow-none"
        >
          {value ? (
            <span className="flex items-center space-x-2">
              <Image
                src={(findOption?.img as string) || ""}
                alt={findOption?.img as string}
                width={25}
                height={25}
                className="rounded-full"
              />
              <span className="font-medium">{findOption?.label as string}</span>{" "}
            </span>
          ) : (
            ""
          )}

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-14 sm:mr-44 md:mr-48 p-0 w-80">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>No result.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <span className="flex items-center space-x-2">
                  <Image
                    src={option?.img}
                    alt={option?.img}
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <span className="font-medium">{option.label}</span>
                </span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
