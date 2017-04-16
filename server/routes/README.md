#Spots REST API

# General Info
key = '1234'
Parking lot ID registered within the database: NV
Range of parking lots: NV001-NV030
  * NV001-NV010 are for 'Staff'
  * NV011-NV030 are for 'Student'

**If a spot has been recently occupied, call .post(/update) first, then hardware will conduct the 5 minute window for user to swipe in**

Potential issues / task list:
  - [ ] checking for expired permits
  - [ ] checking for valid parking ID
    - this could potentially cluster database if left unchecked
  - [ ] drivers using a valid card but unregistered vehicle
  - [ ] create a stronger API key (random hash maybe?)
  - [ ] relay newly occupied/vacant spot to mobile users

##GET
*Parameters:* none
*Returns:* Object containing all user information and will have the same exact structure used in firebase (NOTE: **this is not structured as a JSON object**)

##POST (/update)
This is only for updating vacancy of spot
*Parameters:* (/update/key/lotID/spotID/vacant)
  * if spot is not occupied, set vacant=true
  * else, set vacant=false
*Return:* ({authorized: x });
  * for a vacant spot, x=null since no one is parked
  * for an occupied spot, x is set automatically to false since driver has not yet swiped

##POST (/swipe)
This is used for checking a user's card ID when swiping in
*Parameters:* (/swipe/key/lotID/spotID/cardID)
*Returns:* ({authorized: x});
  * x = false
    1. card ID is not in the database; therefore, not valid
    2. parking type does not match driver's permit type (ie. a student parking on 'Staff')
  * otherwise, x = true
