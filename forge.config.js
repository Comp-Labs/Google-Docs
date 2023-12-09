module.exports = {
  packagerConfig: {
    name: "Google Docs",
    arch: 'all',
    buildIdentifier: 'prod',
    packagerConfig: {
      appBundleId: 'io.techfiddle.google-docs'
    },
    appCopyright: 'Copyright (c) 2023 Tech Fiddle & Google. All Rights Reserved.',
    executableName: "Google-Docs",
    icon: './assets/icon.png',
    out: './dist',
    platform: [
      'darwin',
      'win32',
      'linux',
      'mas'
    ],
    win32metadata: {
      CompanyName: 'Tech Fiddle',
      FileDescription: 'Google Docs Desktop App',
      InternalName: 'Google Docs',
      ProductName: 'Google Docs'
    },
    appCategoryType: 'public.app-category.productivity',
    darwinDarkModeSupport: true,
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-appx',
    //   config: {
    //     packageName: 'Google Docs',
    //     packageDisplayName: 'Google Docs',
    //     packageDescription: 'Google Docs Desktop App',
    //     publisher: 'CN=developmentca',
    //     devCert: './assets/devcert.pfx',
    //     certPass: 'process.env.certPass'
    //   }
    // },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "GoogleDocs",
        authors: 'Tech Fiddle',
        copyright: 'Copyright (c) 2023 Tech Fiddle. All Rights Reserved.',
        description: 'Google Docs Desktop App',
        // exe: 'Google-Docs-Windows',
        setupExe: 'Google-Docs-Windows.exe',
        iconUrl: 'https://cdn.jsdelivr.net/gh/Comp-Labs/cdn/img/apps/electron/google-docs.ico',
        loadingGif: './assets/loading.gif'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        additionalDmgOptions: {},
        name: 'Google Docs',
        background: './assets/background.png',
        icon: './assets/icon.png'
      }
    },
    // {
    //   name: '@electron-forge/maker-pkg',
    //   config: {
    //     identity: 'google-docs-signing-key'
    //   }
    // },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          name: 'Google Docs',
          genericName: 'Google Docs',
          productName: 'Google Docs',
          description: 'Google Docs Desktop App',
          maintainer: 'Tech Fiddle',
          homepage: 'https://techfiddle.io',
          icon: './assets/icon.png',
          depends: [
            "libgtk-3-0",
            "libnss3",
            "libxtst6",
            "xdg-utils",
            "libatspi2.0-0",
            "libuuid1"
          ],
          categories: [
            'Graphics',
            'Office',
            'Utility'
          ]
        }
      },
    },
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          productName: 'Google Docs',
          id: 'io.techfiddle.google-docs',
          genericName: 'Google Docs',
          icon: './assets/icon.png',
          description: 'Google Docs Desktop App',
          modules: [
            "libgtk-3-0",
            "libnss3",
            "libxtst6",
            "xdg-utils",
            "libatspi2.0-0",
            "libuuid1"
          ],
          categories: [
            'Graphics',
            'Office',
            'Utility'
          ]
        }
      }
    },
    {
      name: '@electron-forge/maker-snap',
      config: {
        name: 'Google-Docs-Linux',
        executableName: 'Google-Docs-Linux.snap',
        grade: 'stable'
      }
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        draft: true,
        authToken: 'GITHUB_TOKEN',
        tagPrefix: 'v',
        repository: {
          owner: 'Comp-Labs',
          name: 'Google-Docs'
        },
        prerelease: false
      }
    },
    {
      name: '@electron-forge/publisher-snapcraft',
      config: {
        release: "latest/stable"
      }
    },
  ]
};
