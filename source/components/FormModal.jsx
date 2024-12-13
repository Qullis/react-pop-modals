import '../lib/bootstrap-5.3.3/css/scoped-bootstrap.css';

import { Modal } from 'bootstrap';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useEffect} from "react";

export const FormModal = ({ modalHeader, modalId, fields, schema, callback, data, style, buttonText }) => {
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


    const inputFields = fields.map((field) => {
        try {
            if (field.name === "id" && data) {
                return (
                    <div key={field.name}>
                        <input type='text' value={defaultValues.id} hidden readOnly />
                    </div>
                )
            };
            if ((field.type === "textarea" || field.type === "textArea") && data) {
                return (
                    <div key={field.name}>
                        <div className='form-group'>
                            <label htmlFor={field.name}>{field.label}</ label>
                            <textarea className='form-control' {...register(field.name)} />
                            {errors?.[field.name] && <label className="text-danger">{errors[field.name].message}</label>}
                        </div>
                    </div>
                )
            }
            return (
                <div key={field.name}>
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
            await callback(formData);
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