import React from 'react';
import { render, cleanup } from 'react-testing-library';
import amaps from 'amsterdam-amaps/dist/amaps';
import { rdToWgs84 } from 'shared/services/crs-converter/crs-converter';
import 'jest-styled-components';
import Map, { target } from '..';

jest.mock('amsterdam-amaps/dist/amaps', () => {
  const actual = require.requireActual('amsterdam-amaps/dist/amaps');

  return {
    ...actual,
    createMap: jest.fn(),
  };
});

jest.mock('shared/services/crs-converter/crs-converter', () => {
  const actual = require.requireActual('shared/services/crs-converter/crs-converter');

  return {
    ...actual,
    rdToWgs84: jest.fn(() => ({ latitude: 0.0, longitude: 0.0 })),
  };
});

describe('Map', () => {
  const coordinates = {
    x: 123213,
    y: 488794,
  };
  const center = {
    latitude: 52.3547322,
    longitude: 4.8285841,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(<Map center={center} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a map', () => {
    render(<Map marker={false} search={false} zoom={20} />);

    expect(amaps.createMap).not.toHaveBeenCalled();

    render(<Map coordinates={coordinates} marker={false} search={false} zoom={20} />);

    expect(amaps.createMap).toHaveBeenCalledWith(
      expect.objectContaining({
        marker: false,
        search: false,
        zoom: 20,
      }),
    );
  });

  it('converts points to lat/lng', () => {
    const { rerender } = render(<Map center={center} />);

    expect(rdToWgs84).not.toHaveBeenCalled();

    rerender(<Map coordinates={coordinates} />);

    expect(rdToWgs84).toHaveBeenCalledWith(coordinates);
  });

  it('removes the map instance on unmount', () => {
    const { unmount } = render(<Map center={center} />);

    const mapDiv = document.getElementById(target);
    const div = document.createElement('div');
    mapDiv.appendChild(div);
    const children = mapDiv.childNodes;
    const numChildren = children.length;
    const removeChildSpy = jest.spyOn(mapDiv, 'removeChild');

    expect(children).not.toHaveLength(0);

    unmount();

    expect(removeChildSpy).toHaveBeenCalledTimes(numChildren);
    expect(children).toHaveLength(0);
  });
});
