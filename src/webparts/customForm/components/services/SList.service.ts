import pnp, { ItemAddResult } from 'sp-pnp-js'

export class SList{
    public async exists(listName){
        try{
            let _res = await pnp.sp.web.lists.getByTitle(listName).get();
            return {
                message: "Success",
                data: _res
            }
        }
        catch(e){
            return {
                message: "Error",
                data: e.data.responseBody['odata.error'] ? e.data.responseBody['odata.error'].message.value : JSON.stringify(e)
            }
        }
    }

    public async ensureList(listName){
        // Add functionality to add custom descriptions, templates etc.
        try{
            let _res = await pnp.sp.web.lists.ensure(listName, "Autocreated by FormBuilder")
            return{
                message: "Success",
                data: _res
            }
        }
        catch(e){
            return {
                message: "Error",
                data: e.data.responseBody['odata.error'] ? e.data.responseBody['odata.error'].message.value : JSON.stringify(e)
            }
        }
    }

    public async fieldExists(listName, fieldName){
        try{
            let _res = await pnp.sp.web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(fieldName).get();
            return {
                message: "Success",
                data: _res
            }
        }
        catch(e){
            return {
                message: "Error",
                data: e.data.responseBody['odata.error'] ? e.data.responseBody['odata.error'].message.value : JSON.stringify(e)
            }
        }
    }

    public async addFieldFromXml(listName, fieldXml){
        try{
            let _res = await pnp.sp.web.lists.getByTitle(listName).fields.createFieldAsXml(fieldXml);
            return {
                message: "Success",
                data: _res
            }
        }
        catch(e){
            return {
                message: "Error",
                data: e.data.responseBody['odata.error'] ? e.data.responseBody['odata.error'].message.value : JSON.stringify(e)
            }
        }
    }
}