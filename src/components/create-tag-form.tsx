import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

import * as Dialog from "@radix-ui/react-dialog";

const createTagSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters" }),
  slug: z.string(),
});

type CreateTagSchemaProps = z.infer<typeof createTagSchema>;

export function CreateTagForm() {
  const { register, handleSubmit, watch } = useForm<CreateTagSchemaProps>({
    resolver: zodResolver(createTagSchema),
  });

  const slug = getSlugFromString(watch("name"));

  function getSlugFromString(input: string) {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");
  }

  function createTag(data: CreateTagSchemaProps) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag name
        </label>
        <input
          id="name"
          type="text"
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
          {...register("name")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          className="border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50 w-full text-sm"
          readOnly
          {...register("slug")}
          value={slug}
        />
      </div>

      <div className="flex items-center justify-end gap-1">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button type="submit" className="bg-teal-400 text-teal-950">
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  );
}
