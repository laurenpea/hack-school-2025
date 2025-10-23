export default function userPage({ params }){
    const id = params.slug;
    return <h1>Slug: {id}</h1>
}