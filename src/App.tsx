import { useState } from 'react'
import { Button, ButtonVariant, ButtonSize } from './components/Button'
import './App.css'

interface ToggleOption {
  key: string;
  label: string;
  type: 'toggle' | 'text' | 'select';
  options?: Array<{ value: string; label: string }>;
}

function App() {
  const [settings, setSettings] = useState({
    disabled: false,
    loading: false,
    variant: ButtonVariant.Primary,
    size: ButtonSize.Medium,
    outline: false,
    text: 'Hello Button',
  });

  const toggleOptions: ToggleOption[] = [
    {
      key: 'text',
      label: 'Button Text',
      type: 'text',
    },
    {
      key: 'disabled',
      label: 'Disabled',
      type: 'toggle',
    },
    {
      key: 'loading',
      label: 'Loading',
      type: 'toggle',
    },
    {
      key: 'outline',
      label: 'Outline',
      type: 'toggle',
    },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: Object.values(ButtonVariant).map(variant => ({
        value: variant,
        label: variant.charAt(0).toUpperCase() + variant.slice(1),
      })),
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: Object.values(ButtonSize).map(size => ({
        value: size,
        label: size.charAt(0).toUpperCase() + size.slice(1),
      })),
    },
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderControl = (option: ToggleOption) => {
    switch (option.type) {
      case 'text':
        return (
          <input
            type="text"
            value={settings[option.key as keyof typeof settings] as string}
            onChange={(e) => updateSetting(option.key, e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 w-64"
            placeholder={`Enter ${option.label.toLowerCase()}`}
          />
        );
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings[option.key as keyof typeof settings] as boolean}
              onChange={(e) => updateSetting(option.key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );
      case 'select':
        return (
          <div className="flex gap-2">
            {option.options?.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateSetting(option.key, value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  settings[option.key as keyof typeof settings] === value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reactive Button Component Demo</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
          <div className="flex justify-center mb-8">
            <Button
              variant={settings.variant}
              size={settings.size}
              disabled={settings.disabled}
              isLoading={settings.loading}
              outline={settings.outline}
            >
              {settings.text}
            </Button>
          </div>

          <div className="space-y-4">
            {toggleOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
                {renderControl(option)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Example</h2>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <code className="text-sm text-gray-800">
{`import { Button, ButtonVariant, ButtonSize } from './components/Button';

<Button
  variant={ButtonVariant.${settings.variant}}
  size={ButtonSize.${settings.size}}
  disabled={${settings.disabled}}
  isLoading={${settings.loading}}
  outline={${settings.outline}}
>
  ${settings.text}
</Button>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App