
const getModalStyle = (type, theme, customStyle) => {
    const styles = {
        dark: {
            form: {
                modal: 'bg-dark text-white',
                closeButton: 'btn btn-light',
                actionButton: 'btn btn-light',
                xButton: 'bg-light'
    
            },
            confirm: {
                modal: 'bg-dark text-white',
                closeButton: 'btn btn-secondary',
                actionButton: 'btn btn-danger',
                xButton: 'bg-light'
            },
            info: {
                modal: 'bg-dark text-white',
                closeButton: 'btn btn-secondary',
                xButton: 'bg-light'
            }
        },
        light: {
            form: {
                modal: '',
                closeButton: 'btn btn-secondary',
                actionButton: 'btn btn-secondary',
                xButton: ''
    
            },
            confirm: {
                modal: '',
                closeButton: 'btn btn-secondary',
                actionButton: 'btn btn-danger',
                xButton: ''
            },
            info: {
                modal: '',
                closeButton: 'btn btn-secondary',
                xButton: ''
            }
        }
    }
    
    if(customStyle){
        const newStyle = {...styles[theme][type],...customStyle}; 
        return newStyle;
    };
    return styles[theme][type] ;

};

export default getModalStyle;