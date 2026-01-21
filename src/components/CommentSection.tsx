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
            <h2>Tidigare Kronsparare</h2>
            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.name}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
