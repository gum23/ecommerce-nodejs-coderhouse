import ChatModel from '../db/models/chatModel.js';

class ChatManagerMongo {
    async createMessage(message){
        try {
            const newMessage = new ChatModel(message);
            await newMessage.save();
            
            return "Su mensaje se a enviado correctamente";
        } catch (error) {
            return error;
        }
    }

    async getMessages(){
        try {
            const messageFound = await ChatModel.find();
            if(!messageFound) return "La colección de chats está vacía";
            
            return messageFound;
        } catch (error) {
            return error;
        }
    }

    async deleteMessage(id){
        try {
            const deleteFound = await ChatModel.findByIdAndDelete(id);
            if(!deleteFound) return "No existe esa id en la base de datos";

            return "Mensaje eliminado";
        } catch (error) {
            return error;
        }
        
    }
}

export default ChatManagerMongo;