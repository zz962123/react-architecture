const muiButtonStyle = (props) => {

    let style = ``;
    if(props === "logout"){
        style += `
            background-color: red;
        `;
    }

    if(props === "login"){
        style += `
            background-color: green;
        `;
    }

    return style
}

export default muiButtonStyle; 