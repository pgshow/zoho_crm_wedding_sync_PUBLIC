# zoho_crm_wedding_sync
Scrape wedding users data then sync to Zolo CRM platfrom by RestAPI

* Need to make Chrome Cache for each _Casamentos.pt_ account first.
* Remember click the agree Cookie pop window after login Casamentos, or it will cover your click.

### Initial API
Access token expiry: 3600s

Refresh token expiry: never

Using Zoho API for an account needs to get the refresh token first, then set the refresh token for that account

To use Rest APIs, need to register a client in the user center. 

Instruction: https://www.zoho.com.cn/crm/help/developer/api/register-client.html

### Scope
When you create a Scope for an app, you need point a scope, the value could be _ZohoCRM.modules.CREATE_ or _ZohoCRM.modules.ALL_.

ZohoCRM.modules.CREATE,ZohoCRM.settings.fields.read

More details in: https://www.zoho.com.cn/crm/help/developer/api/oauth-overview.html