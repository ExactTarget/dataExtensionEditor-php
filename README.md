#Use at your own risk, alpha development!
=================

#[OEM Sample App-php]
=================

OEM Sample App is an example application which illustrates how OEM partners can integrate with the MarketingCloud and Fuel APIs to handle account management and a basic implementation of the Fuel Editor&trade;. 

#Requirements
----------
* Access to App Center on http://code.exacttarget.com
* ExactTarget account (as OEM)
* Heroku account on https://id.heroku.com/login
* Heroku Toolbelt installed locally
* Ability to log into your Heroku account via the command line
* Github installed locally: https://help.github.com/articles/set-up-git (see links at top of that page for Windows, Linux, Mac, All setups)
* Text Editor of your choice


#Quick start for local development
-----------

1. Create a directory clone the OEM Sample App repo into it: git@github.com:ExactTarget/oem-sample-editor-php.git
2. Create a new Hub Exchange application in [App Center](http://code.exacttarget.com/appcenter) (requires login) naming it what you want and publishing it once complete. 
3. For the Login URL, put the path to login.php.  For the Home URL, put the path to index.php.  For the Logout URL, put the path for logout.php. (prefix all of these with http://localhost:8888/)
4. Rename config.php.template file to config.php
5. Open config.php and input the Application Secret, ClientID, and Client Secret provided by App Center
6. Remove the config.php file from the .gitignore file (so we can push our app to Heroku and it really works)
7. Commit your changes to Git
8. Login to your heroku account via the command line
9. Create your new app on heroku
    heroku create [name_you_want_for_your_app]
10. When the app is done deploying, open it:
    heroku open

For more information about setting up an application in App Center, please see [App Center Overview](http://code.exacttarget.com/devcenter/getting-started/app-center-overview) and [Registering App](http://code.exacttarget.com/devcenter/devcenter/getting-started/app-center-overview/registering-app).

#Authors
-----------
Benjamin Dean

* http://github.com/creatovisguru

#Copyright and license
-----------

Copyright (c) 2012 ExactTarget

Licensed under the MIT License (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the COPYING file.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
