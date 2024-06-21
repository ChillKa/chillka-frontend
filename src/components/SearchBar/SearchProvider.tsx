import { FormField, FormItem } from '@components/ui/form';
import { ReactNode, createContext, useContext } from 'react';
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  FormProvider,
  RegisterOptions,
  Resolver,
  UseFormReturn,
  useForm,
} from 'react-hook-form';

export type SearchProviderProps<T extends FieldValues> = {
  children: ReactNode;
  defaultValues: DefaultValues<T>;
  resolver?: Resolver<T>;
};

type SearchContextProps<T extends FieldValues> = UseFormReturn<T>;

const SearchContext = createContext<SearchContextProps<any> | undefined>(
  undefined
);

const SearchProvider = <T extends FieldValues>({
  children,
  defaultValues,
  resolver,
}: SearchProviderProps<T>) => {
  const methods = useForm<T>({ defaultValues, resolver });

  return (
    <SearchContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </SearchContext.Provider>
  );
};

export const useSearch = <T extends FieldValues>(): SearchContextProps<T> => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
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
};

export const SearchField = <T extends FieldValues>({
  name,
  rules,
  children,
}: SearchFieldProps<T>) => {
  const methods = useSearch<T>();

  return (
    <FormField
      control={methods.control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <FormItem>
            {children({ value: field.value, onChange: field.onChange })}
          </FormItem>
        );
      }}
    />
  );
};

export default SearchProvider;
