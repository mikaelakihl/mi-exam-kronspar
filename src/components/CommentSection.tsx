export const CommentSection = () => {
    const comments = [
        {
            id: 1,
            name: 'John Doe',
            comment:
                'Tack för att ni hjälpte mig får den mössa jag alltid velat ha! Ni är bäst!!! ',
        },
        {
            id: 2,
            name: 'Jane Doe',
            comment:
                'Tack för att ni hjälpte mig får den mössa jag alltid velat ha! Ni är bäst!!! ',
        },
        {
            id: 3,
            name: 'John Doe',
            comment:
                'Tack för att ni hjälpte mig får den mössa jag alltid velat ha! Ni är bäst!!! ',
        },
    ];

    return (
        <section>
            <h2 className="text-center mb-4">Vad säger tidigare Kronsparare?</h2>
            <ul className="flex flex-col gap-4 md:flex-row">
                {comments.map((comment) => (
                    <li key={comment.id} className=" gap-4">
                        <div className="flex flex-col gap-2 p-8 bg-background-muted/60 glass-effect-input rounded-4xl">

                            <div className="flex"><span>" </span><p className="italic">{comment.comment}<span>"</span></p></div>

                            <p className="text-primary font-bold">{comment.name}</p>


                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
