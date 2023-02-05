import Block from './Block'

function GridBlock ({ data, disconnectBlock }) {
  function AttachmentBlock ({ data }) {
    return (
      <div className='h-full w-full bg-primary/10 flex items-center justify-center'>
        <p className='text-center text-xs'>{data.title}</p>
      </div>
    )
  }

  function ChannelBlock ({ data }) {
    return (
      <div
        className={`h-full w-full flex items-center justify-center border-2 channel-status-${data.status} channel-block p-2`}
      >
        <p className='text-center text-xs-relative text-inherit'>{data.title}</p>
      </div>
    )
  }

  function ImageBlock ({ data }) {
    return (
      <>
        <img src={data.image.thumb.url} className='aspect-square object-contain w-full h-full p-0' />
      </>
    )
  }

  function TextBlock ({ data }) {
    return (
      <div className='border border-primary/25 p-2 h-full w-full overflow-hidden'>
        <p className='text-xs-relative'>{data.content}</p>
      </div>
    )
  }

  function DefaultBlock ({ data }) {
    return (
      <div className='h-full w-full flex items-center justify-center p-2'>
        <p className='text-center text-xs-relative'>{data.title}</p>
      </div>
    )
  }

  const renderBlock = () => {
    switch (data.class) {
      case 'Attachment':
        return <AttachmentBlock data={data} />
      case 'Channel':
        return <ChannelBlock data={data} />
      case 'Image':
        return <ImageBlock data={data} />
      case 'Media':
        return <ImageBlock data={data} />
      case 'Link':
        return <ImageBlock data={data} />
      case 'Text':
        return <TextBlock data={data} />
      default:
        return <DefaultBlock data={data} />
    }
  }

  return (
    <Block data={data} disconnectBlock={disconnectBlock}>
      <div
        className={
          'border text-primary border-transparent hover:border-secondary aspect-square w-full h-full flex flex-col justify-center items-center cursor-pointer'
        }
      >
        {renderBlock()}
      </div>
    </Block>
  )
}

export default GridBlock
