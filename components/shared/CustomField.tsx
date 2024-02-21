import React, {ReactNode} from 'react';
import {Control} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/components/shared/TransformationForm";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";

type CustomFieldProps ={
    control: Control<z.infer<typeof formSchema>> | undefined;
    render: (props:{field:any}) => ReactNode;
    name: keyof z.infer<typeof formSchema>;
    formLabel?: string;
    className?: string;
}
const CustomField = ({control,render,name,formLabel,className}:CustomFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) =>(
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    <FormControl>{render({field})}</FormControl>
                </FormItem>
            )}
        />
    );
};

export default CustomField;
