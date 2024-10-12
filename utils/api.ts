


const createUrl = (path) =>{
    return window.location.origin + path;
}



export const newEntry = async () => {
    const res = await fetch( new Request( createUrl('/api/journal'), {
        method: 'POST',
    }));
    if(res.ok) {
        const data = await res.json();
        return data.data;
    } else {
        throw new Error('Failed to create new entry');
    }
}

export const updateEntry = async (id, content) => {
    const res = await fetch( new Request( createUrl(`/api/journal/${id}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content})
    }));
    if(res.ok) {
        const data = await res.json();
        return data.data;
    } else {
        throw new Error('Failed to update entry');
    }
}
export const deleteEntry = async (id) => {

    const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
        method: 'DELETE', // DELETE method for deleting the entry
        headers: {
            'Content-Type': 'application/json'
        },

    }));

    if (res.ok) {
        return 'Entry deleted successfully'; // Return success message
    } else {
        throw new Error('Failed to delete entry');
    }
};




export const askQuestion = async (question) => {
    const res = await fetch( new Request( createUrl('/api/question'), {
        method: 'POST',
        body: JSON.stringify({question}),
    }));
    if(res.ok) {
        const data = await res.json();
        return data.data;
    } else {
        throw new Error('Failed to resolve the question');
    }    

}