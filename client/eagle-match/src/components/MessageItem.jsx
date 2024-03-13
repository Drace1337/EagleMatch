export default function MessageItem({ message }) {
  console.log(message)
  return (
    <article>
        <h1>{message.topic}</h1>
        <p>{message.message}</p>
        <p>{message.email}</p>
    </article>
  )
}