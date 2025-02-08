import '../lib/bootstrap-5.3.3/css/scoped-bootstrap.css';

import { Modal } from 'bootstrap';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useEffect} from "react";

export const FormModal = ({ modalHeader, modalId, fields, schema, callback, callbackArgs, data, hideIdField, style, buttonText }) => {
    //html needs date in yyyy-mm-dd format when setting default value
    const formatDate = (date) => {
        try {
            if (!date) return undefined;
            const dateToConvert = new Date(date);
            const YYYYMMDD = dateToConvert.toISOString().split('T')[0];
            return YYYYMMDD;
        } catch (error) {
            console.error('Incorrect date format used, an error occurred when parsing the data:', error);
        }
    };

    let defaultValues = {};
    const setDefaultValues = () => {
        const dataObjectArray = data ? Object.entries(data) : null;
        if (dataObjectArray) {
            for (const [key, value] of dataObjectArray) {
                defaultValues[key] = fields.find((field) => field.name === key).type === 'date' ? formatDate(value) : value;
            };
        } else {
            fields.forEach((field) => defaultValues[field.name] = '');
        }
    };

    useEffect(() => {
        setDefaultValues();
        //reset();
    }, [data]);


    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
        mode: "onChange",
        values: defaultValues
    });


    const inputFields = fields.map((field, index) => {
        try {
            if (field.name.toLowerCase() === "id" && data && hideIdField) {
                return (
                    <div key={field.name}>
                        <input type='text' value={defaultValues.id} hidden readOnly />
                    </div>
                )
            };
            if (field.type === "textarea" || field.type === "textArea") {
                return (
                    <div key={field.name} className='mb-2'>
                        <div className='form-group'>
                            <label htmlFor={field.name}>{field.label}</ label>
                            <textarea className='form-control' {...register(field.name)} />
                            {errors?.[field.name] && <label className="text-danger">{errors[field.name].message}</label>}
                        </div>
                    </div>
                )
            };
            if (field.type === "select") {
                const selectOptions = field.options.map((option, index) => {
                    return <option key={field.name + '-' + index} value={option.value}>{option.label}</option>
                })
                return (
                    <div key={field.name} className='mb-2'>
                        <div className='form-group'>
                            <label htmlFor={field.name}>{field.label}</ label>
                            <select className='form-select' {...register(field.name)}>
                                {selectOptions}
                            </select>
                            {errors?.[field.name] && <label className="text-danger">{errors[field.name].message}</label>}
                        </div>
                    </div>
                );
            };
            if (field.type === "checkbox" || field.type === "radio") {
                return (
                    <div key={field.name + '-' + index} className='mb-2 pt-1 mt-2'>
                        {field.topLabel && <label htmlFor={field.name + '-' + index} className='mb-2 text-decoration-underline'>{field.topLabel}</ label>}
                        <div className='form-check' id={field.name + '-' + index}>
                            <input className='form-check-input' type={field.type} {...register(field.name)} value={field.value} />
                            <label className='form-check-label' htmlFor={field.name}>{field.label}</ label>
                            {errors?.[field.name] && <label className="text-danger">{errors[field.name].message}</label>}
                        </div>
                    </div>
                )
            };
            if (field.type === "checkboxInline" || field.type === "radioInline") {
                const type = field.type === "checkboxInline" ? "checkbox" : "radio";
                const checks = field.options.map((box, index) => {
                    return (
                        <div key={'boxGroup-' + index} className='form-check form-check-inline'>
                            <input className='form-check-input' type={type} {...register(field.name)} value={box.value} />
                            <label className='form-check-label' htmlFor={field.name}>{box.label}</ label>
                            {errors?.[field.name] && <label className="text-danger">{errors[field.name].message}</label>}
                        </div>
                    )
                })
                return (
                    <div key={field.name + '-' + index} className='mb-2 pt-1 mt-2'>
                        {field.groupLabel && <label className='mb-2 text-decoration-underline d-block'>{field.groupLabel}</ label>}
                        {checks}
                    </div>
                )
            };
            if (field.type === 'separator') {
                return (
                    <div key={'separator-' + index} className='mb-2'>
                        <hr className='w-100' />
                    </div>
                )
            }
            
            return (
                <div key={field.name} className='mb-2'>
                    <div className="form-group">
                        <label htmlFor={field.name}>{field.label}</ label>
                        <input className='form-control' type={field.type} {...register(field.name)} />
                        {errors?.[field.name] && <label className="text-danger">{errors[field.name].message}</label>}
                    </div>
                </div>
            )
        } catch (error) {
            console.error(error);
            console.error('Error creating the form input fields, make sure that each field in the array has a name, label and type key with corresponding values.');
        }
    });

    const onSubmit = async (formData) => {
        try {
            await callback(formData, callbackArgs);
            const modal = Modal.getInstance(`#${modalId}`);
            modal.hide();
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className='reactModals'>
            <div className="modal fade" id={modalId} tabIndex="-1">
                <div className="modal-dialog">
                    <div className={"modal-content " + style.modal}>
                        <form className='text-start' onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">{modalHeader} </h1>
                                <button type="button" className={"btn-close " + style.xButton} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {inputFields}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className={style.closeButton} data-bs-dismiss="modal">{buttonText.closeButton}</button>
                                <button type='submit' className={style.actionButton}>{buttonText.actionButton}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )


};