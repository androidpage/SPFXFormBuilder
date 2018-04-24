## spfx-form-builder

This is a sharepoint web part used for building forms from JSON. It also has the ability to create lists and fields from the form as opposed to the standard way of doing it which is in reverse.

Documentation for the JSON structure is coming but in the mean time have a look at this example: 

```json
{
    "title": "Test Form",
    "destinationList": "FormbuilderTest",
    "fields": [
        {
            "type": "textfield",
            "name": "single",
            "label": "Single Line Test Field",
            "tooltip": "Extra information about this field would go here",
            "validators":[
                {
                    "validator": "^.{1,100}$",
                    "validatorError": "Please limit this field to 100 characters or less"
                },{
                    "validator": "^[A-z ]+$",
                    "validatorError": "This field can only contain letters"
                }
            ]
        },
        {
            "type": "textfield",
            "name": "abcd",
            "label": "Multiline Text Field",
            "required": true,
            "multi": true
        },
        {
            "type": "dropdown",
            "name": "TestDropdown",
            "label": "Dropdown",
            "multi": true,
            "options": [
                {
                    "key": "1",
                    "text": "Option 1"
                }
            ]
        },
        {
            "type":"ch",
            "name":"choice",
            "label": "Choice Group",
            "options":[
                {
                    "key":"1",
                    "text":"Choice 1"
                },{
                    "key":"2",
                    "text":"Choice 2"
                }
            ]
        }
    ]
}
```

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* sharepoint/* - the bundled SharePoint add-in, in this case the dependencies are packaged with the solution so no need for a CDN

### Deployment
* Package Solution
```
gulp bundle --ship
gulp package-solution --ship
```

* Upload to SharePoint
    * Upoload the sharepoint/solution/spfx-form-builder.sppkg to your sharepoint app catalog
    * Deploy and use.
