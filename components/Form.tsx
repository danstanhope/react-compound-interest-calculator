
import Text from './Text';

export default function Form() {
    return (
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:self-start">
            <div className="mt-1 grid grid-cols-4 gap-4 lg:grid-cols-4">
                <div className="relative block border rounded-lg p-4 shadow">
                    <span className="block text-sm mb-1">I have a</span>
                    <Text
                        defaultValue={50000}
                        increment={1000}
                        type="money"
                    />
                    <span className="block text-sm mt-2">initial investment</span>
                </div>
                <div className="relative block border rounded-lg p-4 shadow">
                    <span className="block text-sm mb-1">I&apos;ll add</span>
                    <Text
                        defaultValue={1000}
                        increment={1000}
                        type="money"
                    />
                    <span className="block text-sm mt-2">each month</span>
                </div>
                <div className="relative block border rounded-lg p-4 shadow">

                    <span className="block text-sm mb-1">I&apos;ll get a</span>
                    <Text
                        defaultValue={7}
                        increment={1}
                        type="percent"
                    /> <span className="text-sm">return</span>
                    <span className="block text-sm mt-2">compounded monthly</span>
                </div>
                <div className="relative block border rounded-lg p-4 shadow">
                    <span className="block text-sm mb-1">I&apos;ve got</span>
                    <Text
                        defaultValue={25}
                        increment={1}
                        type="year"
                    /> <span className="text-sm">years</span>
                    <span className="block text-sm mt-2">to watch my money grow</span>
                </div>

            </div>
        </div >
    )
}
