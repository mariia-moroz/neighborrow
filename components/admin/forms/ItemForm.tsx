"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageUpload from "../../ImageUpload";
import { Spinner } from "@/components/ui/spinner";
import { itemSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createItem } from "@/lib/admin/actions/item";
import { toast } from "sonner";

type ItemFormInput = z.input<typeof itemSchema>;
type ItemFormValues = z.output<typeof itemSchema>;

interface Props extends Partial<ItemFormValues> {
  type?: "create" | "update";
}

const ItemForm = ({ type, ...item }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isCreate = type === "create";

  const form = useForm<ItemFormInput, unknown, ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: item.title ?? "",
      category: item.category ?? "",
      rating: item.rating ?? 5,
      totalItems: item.totalItems ?? 1,
      summary: item.summary ?? "",
      description: item.description ?? "",
      image: item.image ?? "",
      condition: item.condition ?? "",
      included: item.included ?? "",
      brand: item.brand ?? "",
      borrowDuration: item.borrowDuration ?? 1,
    },
  });

  const onSubmit: SubmitHandler<ItemFormValues> = async values => {
    setIsLoading(true);
    const result = await createItem(values);

    if (result.success) {
      toast.success("Success", {
        description: isCreate ? "Item successfully created!" : "Item successfully updated!",
      });
      router.push(`/admin/items/${result.data.id}`);
    } else {
      toast.error(`Error ${isCreate ? "creating item" : "updating item"}`, {
        description: result.error ?? "An error occured",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col gap-6 xs:gap-8 w-full'>
      <form id='auth-form' className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='w-full gap-5 xs:gap-6'>
          <Controller
            key='title'
            name='title'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-title' className='form-label'>
                  Item Title
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-title'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter item title'
                  className='form-input'
                  type='text'
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='category'
            name='category'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-category' className='form-label'>
                  Category
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-category'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter item category (ex. tools)'
                  className='form-input'
                  type='text'
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='rating'
            name='rating'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-rating' className='form-label'>
                  Rating
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-rating'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter item rating'
                  className='form-input'
                  type='number'
                  min={1}
                  max={5}
                  step={0.1}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='totalItems'
            name='totalItems'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-totalItems' className='form-label'>
                  Total number of items
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-totalItems'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter total number of items'
                  className='form-input'
                  type='number'
                  min={1}
                  max={1000}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='image'
            name='image'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-image' className='form-label'>
                  Item Image
                </FieldLabel>

                <ImageUpload
                  value={field.value}
                  onFileChange={field.onChange}
                  placeholder='Upload a file'
                  folder='/items/images'
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='summary'
            name='summary'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-summary' className='form-label'>
                  Item Summary
                </FieldLabel>

                <Textarea
                  {...field}
                  required
                  id='auth-form-summary'
                  aria-invalid={fieldState.invalid}
                  placeholder='Write a brief summary of the item'
                  className='form-input min-h-0!'
                  rows={10}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='description'
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-description' className='form-label'>
                  Item Description
                </FieldLabel>

                <Textarea
                  {...field}
                  required
                  id='auth-form-description'
                  aria-invalid={fieldState.invalid}
                  placeholder='Write full item description'
                  className='form-input min-h-0!'
                  rows={10}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='included'
            name='included'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-included' className='form-label'>
                  Included Components
                </FieldLabel>

                <Textarea
                  {...field}
                  required
                  id='auth-form-included'
                  aria-invalid={fieldState.invalid}
                  placeholder='Write item components separated by comma (ex. cord, box)'
                  className='form-input min-h-0!'
                  rows={10}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='condition'
            name='condition'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-condition' className='form-label'>
                  Condition
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-condition'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter item condition (ex. Excellent)'
                  className='form-input'
                  type='text'
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='brand'
            name='brand'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-brand' className='form-label'>
                  Brand and Model
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-brand'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter item brand and model'
                  className='form-input'
                  type='text'
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            key='borrowDuration'
            name='borrowDuration'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='auth-form-borrowDuration' className='form-label'>
                  Recommended Borrow Duration (days)
                </FieldLabel>

                <Input
                  {...field}
                  required
                  id='auth-form-borrowDuration'
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter recommended borrow duration (days)'
                  className='form-input'
                  type='number'
                  min={1}
                  max={365}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button type='submit' form='auth-form' className='main-button' disabled={isLoading}>
        {type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Item` : "Add Item"}
        {isLoading && <Spinner data-icon='inline-start' />}
      </Button>
    </div>
  );
};

export default ItemForm;
