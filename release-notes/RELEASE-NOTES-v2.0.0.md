# RELEASE NOTES

# :rocket: Release 2.0.0 
###### 2021-10-31

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

⚠️ Some configuration properties are deprecated in this release.

---




## :zap: Customize labels 
###### 2021-10-31

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

Label management has improved using a configuration object

```yml
labels:
  include:
    - release-note/use
  ignore:
    - released
    - release-note/published
  end:
    - release-note/published
```

#### ⚠️ `useLast` attribute is deprecated.

By default **RNG** will include all Pull Request **in** latest published release
If you set `snapshot: true` all Pull Request **since** latest release will be used. 

### Issues
<!-- Link related issue after close using # notation. `Close #123`-->

Close #85 




## :bug: Stop gen pipe if no PRs found 
###### 2021-10-31

### Changes
<!-- Specify changes you've done in your PR, be as specific as you can! :) -->

If no pull requests are found in generation process we will not generate release notes markdown.

This way we are not replacing old **release-notes** with an empty string

### Issues
<!-- Link related issue after close using # notation. `Close #123`-->

Close #83 




