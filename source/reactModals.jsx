import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Modal } from 'bootstrap';

import { ConfirmationModal } from './components/ConfirmationModal';
import { FormModal } from './components/FormModal';
import { waitForElement } from './utils/utils';

import modalStorage from './modalStorage/ModalStorage';
import { validateModal } from './utils/utils';
import getModalStyle from './utils/styles';
//modal schemas
import formSchema from './schemas/formSchema';
import confirmSchema from './schemas/confirmSchema';

const schemas = {
    form: formSchema,
    confirm: confirmSchema
};
/**
     * useSubmitModal.
     * 
     * @param {object}      options
     * 
     */
export const useReactModals = (options) => {
    const { append = true, usevalidation=true } = options;

    const createStoredModal = (modalProperties) => {
        const {
            modalId,
            modalHeader = 'Modal Header',
            fields = [],
            bodyText,
            schema,
            callback,
            theme,
            style,
            buttonText,
            type
        } = modalProperties;
        const modalProps = {
            modalId,
            modalHeader,
            fields,
            bodyText,
            schema,
            callback,
            theme,
            style,
            buttonText,
            type
        };
        if (modalId) {
            throw new Error('Modal ID is required'); //all modals need id and type, validate here instead of using schema
        };
        if (!type) {
            throw new Error('Modal type is required');
        };
        const errors = usevalidation? validateModal(modalProperties, schema[type]) : [];
        if (errors.length > 0) {
            errors.forEach((error) => console.error(error));
            return false;
        };
        if (!modalStorage.getElementById(modalId)) {
            modalStorage.addModal(modalProps);
            return true;
        }
        return true; // modal with id is already created, but return true anyway
    };


    const getModalElement = (modalId) => { //update to work with confirm modal
        if (append) {
            throw new Error('Cannot use function `getModalElement` when using `append');
        }
        //if the user don't want to use append functionality
        return true;
    };

    const showStoredModal = (modalId, options) => {
        const { formDefaultData, callbackArguments } = options ?? {};
        if (!append) {
            const modalElement = document.getElementById(modalId);
            if (!modalElement) {
                console.error(`Modal with ID ${modalId} not found`);
                return;
            }
            //show not append modal
            return;
        };
        let modalProps = modalStorage.getModalById(modalId);
        modalProps.data = formDefaultData;
        modalProps.callbackArgs = callbackArguments;
        showModal()
    };

    const showModal = (modalProperties, isStored) => {
        let modalProps;
        if(!isStored) { //if using stored modal, all props are already set and validated in modalProperties
            const {
                modalId = `modal-${Math.floor(Date.now() / 100)}`,
                modalHeader,
                fields = [],
                schema,
                bodyText,
                callback,
                formDefaultData,
                style,
                theme,
                buttonText,        //tidy up this section
                type
            } = modalProperties;
            modalProps = {
                modalId,
                modalHeader,
                fields,
                schema,
                bodyText,
                theme,
                callback,
                data: formDefaultData ?? undefined,
                style,
                buttonText,
                type
            };
            const errors = usevalidation? validateModal(modalProps, schemas[type]) : [];
            if (errors.length > 0) {
                errors.forEach((error) => console.error(error));
                return false;
            };
        }else {
            modalProps = modalProperties; //stored modal
        };
        modalProps.style = getModalStyle(modalProps.type, modalProps.theme, modalProps.style);
        const modalNode = document.createElement('div');
        document.body.appendChild(modalNode);
        const root = createRoot(modalNode);
        switch (modalProps.type) {
            case 'form':
                root.render(<FormModal key={modalProps.modalId} {...modalProps} />);
                break;
            case 'confirm':
                root.render(<ConfirmationModal key={modalProps.modalId} {...modalProps} />);
                break;
        };
        openModal(modalNode, root, modalProps.modalId);
        
    };


    async function openModal(modalNode, root, modalId) {
        const elementexists = await waitForElement(`#${modalId}`);
        if (elementexists) {
            const modal = new Modal(`#${modalId}`);
            modal.show();
            document.getElementById(modalId).addEventListener('hidden.bs.modal', event => {
                modal.dispose()
                root.unmount();
                modalNode.remove();
            });
        } else {
            console.error(`Modal with ID ${modalId} not found`);
        };
    };

    return {
        createStoredModal,
        showStoredModal,
        showModal,
        getModalElement,
        // BootstrapFormModal,
    };
};


