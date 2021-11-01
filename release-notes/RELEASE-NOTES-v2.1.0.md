
# :rocket: Release 2.1.0 
###### 2021-11-01

---




## :sparkles: Add preview comment method 
###### 2021-10-31

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

 Now you can preview how Release Notes will look like  in a customizable comment.

#### 🔧  How to use it

 We suggest to configure a Github Action on Pull Requests to main that executes `rng gen --issue ${github.event.number} --snapshot`.

#### 📖 Final result

After this scripts ends you will see a comment in your PR showing the relase notes markdown

