# [2.5.0](https://github.com/adrianiy/release-notes-generator/compare/v2.4.0...v2.5.0) (2022-05-12)


### Features

* add custom formats with `header` and `title` ([#110](https://github.com/adrianiy/release-notes-generator/issues/110)) ([84300fa](https://github.com/adrianiy/release-notes-generator/commit/84300fa6913f8ce82c38ed99a36e2b4633a41ce2))

# [2.4.0](https://github.com/adrianiy/release-notes-generator/compare/v2.3.0...v2.4.0) (2021-12-01)


### Features

* Order release note issue types ([#106](https://github.com/adrianiy/release-notes-generator/issues/106)) ([9a1eae2](https://github.com/adrianiy/release-notes-generator/commit/9a1eae2d9cf6981ed5ff27916c1a19c2f54042a3))

# [2.3.0](https://github.com/adrianiy/release-notes-generator/compare/v2.2.2...v2.3.0) (2021-11-04)


### Features

* add ignored tag option ([#102](https://github.com/adrianiy/release-notes-generator/issues/102)) ([dbf2ca6](https://github.com/adrianiy/release-notes-generator/commit/dbf2ca6fc572bef052b45e07e07ef20aeaeb31c6))

## [2.2.1](https://github.com/adrianiy/release-notes-generator/compare/v2.2.0...v2.2.1) (2021-11-02)


### Bug Fixes

* use last release md in webhooks ([#96](https://github.com/adrianiy/release-notes-generator/issues/96)) ([c53e58d](https://github.com/adrianiy/release-notes-generator/commit/c53e58df1464684a12634a3e917c39c0f1f6d986))

# [2.1.0](https://github.com/adrianiy/release-notes-generator/compare/v2.0.0...v2.1.0) (2021-11-01)


### Features

* add preview comment method ([#90](https://github.com/adrianiy/release-notes-generator/issues/90)) ([25bce6d](https://github.com/adrianiy/release-notes-generator/commit/25bce6d9c5c7f66e0d245476ccdd8a008a38ed76))

# [2.0.0](https://github.com/adrianiy/release-notes-generator/compare/v1.8.0...v2.0.0) (2021-10-31)


### Bug Fixes

* stop gen pipe if no PRs found ([#84](https://github.com/adrianiy/release-notes-generator/issues/84)) ([985b304](https://github.com/adrianiy/release-notes-generator/commit/985b3048eb3f568cd1386c29f17e3b4abb4cc1de))


* feat!: improve label and release configuration (#86) ([1e7e499](https://github.com/adrianiy/release-notes-generator/commit/1e7e499e94080591b543df3b7122c27df633e3c2)), closes [#86](https://github.com/adrianiy/release-notes-generator/issues/86)


### BREAKING CHANGES

* `useLast` attribute is deprecated.

By default RNG will include all Pull Request in latest published release
If you set snapshot: true all Pull Request since latest release will be used.

# [1.8.0](https://github.com/adrianiy/release-notes-generator/compare/v1.7.0...v1.8.0) (2021-10-30)


### Features

* split release notes by release number ([#77](https://github.com/adrianiy/release-notes-generator/issues/77)) ([6007f0d](https://github.com/adrianiy/release-notes-generator/commit/6007f0dcee2134af896b40f31c76a4fabd16139e))

# [1.7.0](https://github.com/adrianiy/release-notes-generator/compare/v1.6.0...v1.7.0) (2021-10-30)


### Features

* add notification customization config ([04a3f7d](https://github.com/adrianiy/release-notes-generator/commit/04a3f7d118a5a84c94429fa7aa7b2b23d78171cd))

# [1.6.0](https://github.com/adrianiy/release-notes-generator/compare/v1.5.0...v1.6.0) (2021-10-22)


### Bug Fixes

* **generator:** move section decoration to config ([#60](https://github.com/adrianiy/release-notes-generator/issues/60)) ([dc326d3](https://github.com/adrianiy/release-notes-generator/commit/dc326d38f4e54cdbcc8e4758b286ecd3a621c152))


### Features

* Use last n releases ([#62](https://github.com/adrianiy/release-notes-generator/issues/62)) ([45eee85](https://github.com/adrianiy/release-notes-generator/commit/45eee8523986e7d08a7ea034522718709a454289))

# [1.5.0](https://github.com/adrianiy/release-notes-generator/compare/v1.4.0...v1.5.0) (2021-10-19)


### Features

* log repo data ([b7a7767](https://github.com/adrianiy/release-notes-generator/commit/b7a7767be6462e64e9cfc170b3d81cfa5b1aae9b))

# [1.4.0](https://github.com/adrianiy/release-notes-generator/compare/v1.3.1...v1.4.0) (2021-10-19)


### Features

* add since option to change start date filter ([#54](https://github.com/adrianiy/release-notes-generator/issues/54)) ([9cf88dc](https://github.com/adrianiy/release-notes-generator/commit/9cf88dcd94c5147758fdea49827effdd8df86304))

## [1.3.1](https://github.com/adrianiy/release-notes-generator/compare/v1.3.0...v1.3.1) (2021-10-19)


### Bug Fixes

* fix lint errors ([8c4019e](https://github.com/adrianiy/release-notes-generator/commit/8c4019e9c03598ae4714b07f023c54c5274a3285))

# [1.3.0](https://github.com/adrianiy/release-notes-generator/compare/v1.2.0...v1.3.0) (2021-10-18)


### Bug Fixes

* test webhooks instead of publish flag ([2b696be](https://github.com/adrianiy/release-notes-generator/commit/2b696be2a801c00e0fd6b929e8c491e22ee97816))


### Features

* improve render of teams activity cards ([bd0d951](https://github.com/adrianiy/release-notes-generator/commit/bd0d951ff577808d0792e90c4ce72166c47debf7))

# [1.2.0](https://github.com/adrianiy/release-notes-generator/compare/v1.1.3...v1.2.0) (2021-10-18)


### Features

* add query filter option ([#47](https://github.com/adrianiy/release-notes-generator/issues/47)) ([f9fb644](https://github.com/adrianiy/release-notes-generator/commit/f9fb6447a14972e844804000691b1feca34cb3aa))

## [1.1.3](https://github.com/adrianiy/release-notes-generator/compare/v1.1.2...v1.1.3) (2021-10-17)


### Bug Fixes

* change graphql-import-node to deps ([1c61415](https://github.com/adrianiy/release-notes-generator/commit/1c61415b370894dc10921fc13e3bda7d5dcce38f))

## [1.1.2](https://github.com/adrianiy/release-notes-generator/compare/v1.1.1...v1.1.2) (2021-10-17)


### Bug Fixes

* fix release files to publish lib/ ([04c0dbe](https://github.com/adrianiy/release-notes-generator/commit/04c0dbec6b119c6defafc43c9fb675e35130d776))

# [1.1.0](https://github.com/adrianiy/release-notes-generator/compare/v1.0.0...v1.1.0) (2021-10-17)


### Features

* Add assets publishment method ([#30](https://github.com/adrianiy/release-notes-generator/issues/30)) ([7abe703](https://github.com/adrianiy/release-notes-generator/commit/7abe7035c5b2ebc15a255bd571b75472131abef7))
* add ignored labels option ([#29](https://github.com/adrianiy/release-notes-generator/issues/29)) ([9887eef](https://github.com/adrianiy/release-notes-generator/commit/9887eef42df8c363e1139043efe9e0d872ace496))

# 1.0.0 (2021-10-16)


### Bug Fixes

* change config file name ([#23](https://github.com/adrianiy/release-notes-generator/issues/23)) ([976ef0c](https://github.com/adrianiy/release-notes-generator/commit/976ef0c16a06ecd8e9ad4ef728ea1d0dc3b52542))


### Features

* add cli interface ([#14](https://github.com/adrianiy/release-notes-generator/issues/14)) ([b6b75e3](https://github.com/adrianiy/release-notes-generator/commit/b6b75e3e312c2235470c5756eeaa4ff089dbecb9))
* add configuration ([#13](https://github.com/adrianiy/release-notes-generator/issues/13)) ([57e392d](https://github.com/adrianiy/release-notes-generator/commit/57e392dba23633dd4ae5a617aa58d5f7aadb8d97))
* add generator ([#11](https://github.com/adrianiy/release-notes-generator/issues/11)) ([4f1109f](https://github.com/adrianiy/release-notes-generator/commit/4f1109f6eff8a94633bae21b6dfb70e786168df6))
* add icons in templates ([70c95e8](https://github.com/adrianiy/release-notes-generator/commit/70c95e8db415c7cb2f647a23f093012d43285c1d))
* add parser to recover pr list ([#7](https://github.com/adrianiy/release-notes-generator/issues/7)) ([22568b2](https://github.com/adrianiy/release-notes-generator/commit/22568b21448c985c904e3531b307aabecb79278b))
* add semantic release ([#17](https://github.com/adrianiy/release-notes-generator/issues/17)) ([3a76fc5](https://github.com/adrianiy/release-notes-generator/commit/3a76fc5a567622a0b4ce3c32211ea19bdae9e9c4))
