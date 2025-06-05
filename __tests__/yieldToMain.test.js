import {jest} from '@jest/globals';
import yieldToMain from '../src/yieldToMain.js';
import yieldToMainESM from '../dist/yieldToMain.esm.js';

describe('yieldToMainESM', () => {
  it('should exist and give us a promise', () => {
    expect(yieldToMainESM()).toBeInstanceOf(Promise);
  });
});

describe('yieldToMain', () => {
  let originalScheduler;

  beforeEach(() => {
    originalScheduler = global.scheduler;
  });

  afterEach(() => {
    global.scheduler = originalScheduler;
  });

  it('should return a promise', () => {
    expect(yieldToMain()).toBeInstanceOf(Promise);
  });

  it('should resolve after yielding to the main thread', async () => {
    const promise = yieldToMain();
    expect(promise).toBeInstanceOf(Promise);
    await promise;
  });

  it('should use scheduler.yield when available', async () => {
    const mockYield = jest.fn().mockResolvedValue(undefined);
    global.scheduler = {yield: mockYield};

    await yieldToMain();
    expect(mockYield).toHaveBeenCalled();
  });

  it('should fall back to setTimeout when scheduler.yield is not available', () => {
    global.scheduler = undefined;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    yieldToMain();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 0);

    setTimeoutSpy.mockRestore();
  });
});
