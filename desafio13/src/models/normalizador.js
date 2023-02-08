const { normalize, denormalize, schema } = require('normalizr');
const util = require('util')

class Normalizador {
    
    print(objeto) {
        console.log(util.inspect(objeto,false,12,true))
    }
    getDataNormalized(dataToNormalize) {
        const messages = JSON.parse(JSON.stringify(dataToNormalize));
        const authorSchema = new schema.Entity('authors')
        const messageSchema = new schema.Entity('mensajes', {
          author: authorSchema,
        },{idAttribute:'_id'})
        const global = new schema.Entity('global', {
          messages: [messageSchema],
        })
        const data = { id: 'mensajes', messages }
        // const dataNormalized = normalize(data, global)
        

        // console.log("----------OBJETO ORIGINAL----------");
        // this.print(data);
        // console.log(JSON.stringify(data).length);
        
        // console.log("----------OBJETO NORMALIZADO----------");
        // const normalizedData = normalize(data, chat);
        const dataNormalized = normalize(data, global)
        // this.print(dataNormalized);
        // console.log(JSON.stringify(dataNormalized).length);

        // console.log("----------OBJETO DENORMALIZADO----------");
        const denormalizedData = denormalize(dataNormalized.result, global, dataNormalized.entities);
        // this.print(denormalizedData);
        // console.log(JSON.stringify(denormalizedData).length);
        
        return dataNormalized;

        // console.log(JSON.stringify(normalizedData).length);

        /*
        // console.log(data_to_normalize);
        const messages = JSON.parse(JSON.stringify(data_to_normalize));
        const authorSchema = new schema.Entity('authors')
        const messageSchema = new schema.Entity('mensajes', {
          author: authorSchema,
        },{idAttribute:'_id'})
        const global = new schema.Entity('global', {
          text: [messageSchema],
        })

        const data = { id: 'text', messages }

        const dataNormalized = normalize(data, global)
        return dataNormalized;
        */
    }
}
module.exports = Normalizador