## spfx-form-builder

This is a sharepoint web part used for building forms from JSON. It also has the ability to create lists and fields from the form as opposed to the standard way of doing it which is in reverse.

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
    * Upoload the sharepoint/solution/SPFXFormBuilder.sppkg to your sharepoint app catalog
    * Deploy and use.
