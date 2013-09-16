# [ALPHA NOT READY FOR PRODUCTION]
=================
#[Data Extension Editor - PHP]
=================

The Data Extension Editor is a tool for modifying Data Extensions in your ExactTarget account.

#Requirements
----------
* Access to App Center on http://code.exacttarget.com
* ExactTarget account (with Data Extensions enabled)


#Quick start for local development
-----------

1. Create a directory clone the Data Extension Editor App repo into it: git@github.com:ExactTarget/dataExtensionEditor-php.git
2. Create a new Hub Exchange application in [App Center](http://code.exacttarget.com/appcenter) (requires login) naming it what you want and publishing it once complete. 
3. For the Login URL, put the path to login.php.  For the Home URL, put the path to index.php.  For the Logout URL, put the path for logout.php. (prefix all of these with http://localhost:8888/)
4. Rename config.php.template file to config.php
5. Open config.php and input the Application Secret, ClientID, and Client Secret provided by App Center
6. Remove the config.php file from the .gitignore file (so we can push our app to Heroku and it really works)
7. Commit your changes to Git

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
