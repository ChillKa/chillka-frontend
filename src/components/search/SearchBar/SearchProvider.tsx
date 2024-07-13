'use client';

import { FormField, FormItem } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import useMediaQuery from '@hooks/use-media-query';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  FormProvider,
  RegisterOptions,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { SearchParamsSchema } from './fields/utils';

export type SearchProviderProps<T extends FieldValues> = {
  children: ReactNode;
  defaultValues: DefaultValues<T>;
};

type SearchContextProps<T extends FieldValues> = UseFormReturn<T> & {
  isMobile: boolean;
};

const SearchContext = createContext<SearchContextProps<any> | undefined>(
  undefined
);

const SearchProvider = <T extends FieldValues>({
  children,
  defaultValues,
}: SearchProviderProps<T>) => {
  const resolver = zodResolver(SearchParamsSchema);
  const methods = useForm<T>({ defaultValues, resolver });
  const { matches: isMobile } = useMediaQuery();

  const contextValue: SearchContextProps<T> = useMemo(
    () => ({
      ...methods,
      isMobile,
    }),
    [methods, isMobile]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </SearchContext.Provider>
  );
};

export const useSearchProvider = <
  T extends FieldValues,
>(): SearchContextProps<T> => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchProvider must be used within a SearchProvider');
  }
  return context;
};

export type SearchFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  rules?: RegisterOptions;
  children: (props: {
    value: any;
    onChange: (value: any) => void;
  }) => ReactNode;
  className?: string;
};

export const SearchField = <T extends FieldValues>({
  name,
  rules,
  children,
  className,
}: SearchFieldProps<T>) => {
  const methods = useSearchProvider<T>();

  return (
    <FormField
      control={methods.control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {children({ value: field.value, onChange: field.onChange })}
          </FormItem>
        );
      }}
    />
  );
};

export default SearchProvider;
