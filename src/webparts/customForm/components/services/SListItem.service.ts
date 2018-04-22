import pnp, { ItemAddResult } from 'sp-pnp-js'

export class SListItem{
    public async get(listTitle, id?){
        try{
            let _list = pnp.sp.web.lists.getByTitle(listTitle);
            let _res = {
                message: "Success",
                data: (id ? await _list.items.getById(id) : await _list.items.get()).data
            };
            return _res;
        }
        catch(e){
            return {
                message: "Error",
                data: e.data.responseBody['odata.error'] ? e.data.responseBody['odata.error'].message.value : JSON.stringify(e)
            }
        }
    }

    public async save(listTitle, item, id?){
        try{
            let _list = pnp.sp.web.lists.getByTitle(listTitle);
            let _res = {
                message: "Success",
                data: (id ? await _list.items.getById(id).update(item) : await _list.items.add(item)).data
            };
            return _res;
        }
        catch(e){
            return {
                message: "Error",
                data: e.data.responseBody['odata.error'] ? e.data.responseBody['odata.error'].message.value : JSON.stringify(e)
            };
        }
    }
}