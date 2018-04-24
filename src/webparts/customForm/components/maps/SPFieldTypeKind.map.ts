export class SPFieldTypeKindMap{
    public mapToInternal(fieldTypeKind){
        switch (fieldTypeKind){
            case 2: {
                return {
                    type: ["textfield", "tf"],
                    multi: false
                }
            }
            case 3: {
                return{
                    type: ["textfield", "tf"],
                    multi: true
                }
            }
        }
    }

    private _mapInternalTypeToXml(field){
        switch(field.type){
            case "tf":
            case "textfield":{
                return field.multi ? "Note" : "Text"
            }
            case "choice":
            case "ch":
            case "dropdown":
            case "dd":{
                return field.lookupList ? "Lookup" : "Choice"
            }
        }
    }

    public mapToXML(field){
        let _mappedXMLType = this._mapInternalTypeToXml(field);
        return `
            <Field
              Type="${ _mappedXMLType }"
              DisplayName="${ field.name }"
              Description="${ field.label }"
              Name="${ field.name }"
              StaticName="${ field.name.replace(" ","-") }"
              Required="${ field.required ? "TRUE" : "FALSE" }"
              Group="FormBuilder"
              ShowInEditForm="TRUE"
              ${ (["Lookup"].indexOf(_mappedXMLType) >= 0 && field.lookupList) ? `List="${ field.lookupList }"` : "" }
              ${ (["Lookup"].indexOf(_mappedXMLType) >= 0 && field.lookupListField) ? `ShowField="${ field.lookupListField || "Title" }"` : "" }
              ${ (["Choice", "Lookup"].indexOf(_mappedXMLType) >= 0 && field.multi) ? `Mult="TRUE"` : `Mult="FALSE"` }
            >
            ${ (["Choice"].indexOf(_mappedXMLType) >= 0 && field.options.length > 0) ? 
                `<CHOICES>${ field.options.map(val => `<CHOICE value="${ val.text }">${ val.text }</CHOICE>`).join("") }</CHOICES>`
                : "" 
              }
            </Field>
          `;
    }
}