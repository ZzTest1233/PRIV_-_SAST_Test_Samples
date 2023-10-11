#!/bin/sh
 
SECRETDATA="My password is 12345."
echo > /tmp/mysecretdata
chmod og-rwx /tmp/mysecretdata
echo "$SECRETDATA" >> /tmp/mysecretdata