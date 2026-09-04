export type SchemaField = {
  name: string;
  title: string;
  type: string;
  rows?: number;
  placeholder?: string;
  options?: any;
  to?: any[];
  initialValue?: any;
  validation?: (rule: any) => any;
};

export type SchemaType = {
  name: string;
  title: string;
  type: string;
  fields: SchemaField[];
};

export function defineType(schema: SchemaType): SchemaType {
  return schema;
}

export function defineField(field: SchemaField): SchemaField {
  return field;
}
