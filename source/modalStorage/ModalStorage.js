

class ModalStorage {

    constructor() {
        this.allModals = [];
        this.ModalStorage = null;
    }

    static initialize() {
        this.ModalStorage = new ModalStorage();
        return this.ModalStorage;
    }
    addModal(modal) {
        this.allModals.push(modal);
    }
    getAllModals() {
        return this.allModals;
    }
    removeModal(modal) {
        this.allModals = this.allModals.filter(m => m!== modal);
    }
    getModalById(modalId) {
        return this.allModals.find(m => m.id === modalId);
    }
};

const modalStorage = ModalStorage.initialize();

export default modalStorage