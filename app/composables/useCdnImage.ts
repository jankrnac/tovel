export const useCdnImage = (imageId, type) => {

    let src = ''

    if(imageId)
    {
        if(imageId.cloud_id)
        {
            src = `https://imagedelivery.net/N4rAKr0c4NgoYw9LZnG5Ew/${imageId.cloud_id}/public`
        }
        else
        {
            src = `https://imagedelivery.net/N4rAKr0c4NgoYw9LZnG5Ew/${imageId}/public`
        }
    }
    else
    {   
        if(type == 'banner') src = 'https://imagedelivery.net/N4rAKr0c4NgoYw9LZnG5Ew/93870f17-ff06-4333-f95d-f3170b6fca00/public'
        if(type == 'product') src = 'https://imagedelivery.net/N4rAKr0c4NgoYw9LZnG5Ew/d11ac4bc-1460-45dc-e783-95f8a0a5ce00/box'
        if(type == 'category') src = 'https://imagedelivery.net/N4rAKr0c4NgoYw9LZnG5Ew/6f0d1aeb-530f-4864-715b-9dfae9b85000/box'

    }


    return {
        src
    }
}