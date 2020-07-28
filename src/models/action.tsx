import { ImageSourcePropType } from 'react-native';

export class Action {

    id: string | undefined
    date: string | undefined
    title: string | undefined
    image?: ImageSourcePropType = [];
    //image: ImageSourcePropType = require('../assets/images/image.jpeg');
    
    constructor (id: string, date: string, title: string, image?: ImageSourcePropType | undefined) {
        this.id = id
        this.date = date
        this.title = title
        if (this.image) this.image = image
    }

}