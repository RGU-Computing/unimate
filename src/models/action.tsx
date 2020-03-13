import { ImageSourcePropType } from 'react-native';

export class Action {

    date: string
    title: string
    image: ImageSourcePropType = require('../assets/images/image.jpeg');
    
    constructor (date: string, title: string, image?: ImageSourcePropType){
       this.date = date;
       this.title = title;
       if (image) this.image = image;
    }

}