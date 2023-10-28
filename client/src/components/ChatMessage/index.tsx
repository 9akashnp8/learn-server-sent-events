
type Props = {
    user: string,
    content: string,
}

export default function ChatMessage({ user, content }: Props) {

    if (!content) return null;

    return (
        <div style={{
            color: user === 'system' ? 'black' : 'white',
            backgroundColor: user === 'system' ? 'lightgrey' : 'black',
            padding: 10,
            margin: 5,
            borderRadius: 10
        }}>
            {content}
        </div>
    )
}
