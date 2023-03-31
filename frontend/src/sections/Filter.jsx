export const Filter = ({onSelectedOptionsChange}) => {
    const options = [
        { label: "What inspired Shakespeare to write Romeo and Juliet?" },
        { label: "How does Shakespeare portray the theme of betrayal in Julius Caesar?" },
        { label: "What role do supernatural elements play in Macbeth?" },
        { label: "How does the character of Iago manipulate others in Othello?" },
        { label: "Why is The Tempest considered one of Shakespeare's most magical and imaginative plays?" },
        { label: "What makes Shakespeares sonnets unique and memorable?" },
    ];


    const selectChip = (option) => {
        onSelectedOptionsChange(option);
    };

    return (
        <div className="filter">
            {options.map((option,index) => (
                <div key={index} className="chip" onClick={() => selectChip(option)}>
                    {option.label}
                </div>
            ))}
        </div>
    );
}